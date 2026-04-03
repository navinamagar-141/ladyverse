import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://jciwfrjptxfgcnymnnhx.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjaXdmcmpwdHhmZ2NueW1ubmh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2ODA0MzYsImV4cCI6MjA4OTI1NjQzNn0.AastrkoPb7w-IdSGseCFoSGeIARXuowDvKwK3NgTYWA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey)