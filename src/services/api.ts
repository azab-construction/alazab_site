import { supabase as _supabase } from '@/integrations/supabase/client';
import type { PostgrestError } from '@supabase/supabase-js';

// Loose-typed client for tables not present in generated types
const supabase = _supabase as any;

export class ApiError extends Error {
  constructor(
    message: string,
    public code?: string,
    public details?: unknown,
    public status?: number
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface RetryOptions {
  maxRetries?: number;
  delay?: number;
  backoff?: boolean;
}

const DEFAULT_RETRY_OPTIONS: RetryOptions = {
  maxRetries: 3,
  delay: 1000,
  backoff: true,
};

export const withRetry = async <T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> => {
  const { maxRetries = 3, delay = 1000, backoff = true } = {
    ...DEFAULT_RETRY_OPTIONS,
    ...options,
  };

  let lastError: Error | null = null;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (i < maxRetries - 1) {
        const waitTime = backoff ? delay * Math.pow(2, i) : delay;
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
  }

  throw lastError || new Error('Max retries exceeded');
};

export const handleSupabaseError = (error: PostgrestError | null): ApiError | null => {
  if (!error) return null;

  const message = error.message || 'An error occurred';
  const code = error.code || 'UNKNOWN_ERROR';

  console.error('[API Error]', { message, code, error });

  return new ApiError(message, code, error, undefined);
};

// Projects API
export const projectsApi = {
  getAll: async () => {
    return withRetry(async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw handleSupabaseError(error);
      return data || [];
    });
  },

  getById: async (id: string) => {
    return withRetry(async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw handleSupabaseError(error);
      return data;
    });
  },

  create: async (projectData: any) => {
    return withRetry(async () => {
      const { data, error } = await supabase
        .from('projects')
        .insert([projectData])
        .select()
        .single();

      if (error) throw handleSupabaseError(error);
      return data;
    });
  },

  update: async (id: string, updates: any) => {
    return withRetry(async () => {
      const { data, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw handleSupabaseError(error);
      return data;
    });
  },

  delete: async (id: string) => {
    return withRetry(async () => {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw handleSupabaseError(error);
      return true;
    });
  },
};

// Contact Messages API
export const contactApi = {
  submit: async (message: any) => {
    return withRetry(async () => {
      const { data, error } = await supabase
        .from('contact_messages')
        .insert([message])
        .select()
        .single();

      if (error) throw handleSupabaseError(error);
      return data;
    });
  },

  getAll: async () => {
    return withRetry(async () => {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw handleSupabaseError(error);
      return data || [];
    });
  },
};

// Maintenance Tasks API
export const maintenanceApi = {
  getAll: async () => {
    return withRetry(async () => {
      const { data, error } = await supabase
        .from('maintenance_tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw handleSupabaseError(error);
      return data || [];
    });
  },

  create: async (taskData: any) => {
    return withRetry(async () => {
      const { data, error } = await supabase
        .from('maintenance_tasks')
        .insert([taskData])
        .select()
        .single();

      if (error) throw handleSupabaseError(error);
      return data;
    });
  },

  update: async (id: string, updates: any) => {
    return withRetry(async () => {
      const { data, error } = await supabase
        .from('maintenance_tasks')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw handleSupabaseError(error);
      return data;
    });
  },
};
