CREATE TABLE public.payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  operation_id text NOT NULL UNIQUE,
  label text NOT NULL DEFAULT '',
  plan text NOT NULL DEFAULT '',
  amount numeric NOT NULL DEFAULT 0,
  withdraw_amount numeric NOT NULL DEFAULT 0,
  expected_amount numeric NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'paid',
  sender text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  paid_at text NOT NULL DEFAULT ''
);
GRANT SELECT ON public.payments TO authenticated;
GRANT ALL ON public.payments TO service_role;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read payments" ON public.payments FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));