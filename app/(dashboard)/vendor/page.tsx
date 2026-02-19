// app/(dashboard)/vendor/page.tsx
import { redirect } from 'next/navigation';

export default function VendorRootPage() {
  redirect('/dashboard/vendor/dashboard');
}