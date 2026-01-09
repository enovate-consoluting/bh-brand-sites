import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

interface Client {
  client_id: string;
  company_name: string;
  logo_url: string | null;
}

export default async function PreviewIndexPage() {
  const supabase = await createClient();

  // Fetch all clients with branding
  const { data: clients } = await supabase
    .from('clients')
    .select('client_id, company_name, logo_url')
    .order('company_name');

  // Fetch which clients have branding configured
  const { data: brandedClients } = await supabase
    .from('client_branding')
    .select('client_id');

  const brandedClientIds = new Set(brandedClients?.map(b => b.client_id) || []);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-yellow-400 text-black text-center py-3 rounded-t-lg font-bold">
          PREVIEW MODE - Local Testing Only
        </div>

        <div className="bg-white rounded-b-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-2">Brand Sites Preview</h1>
          <p className="text-gray-600 mb-6">
            Click a brand to preview its site. Brands with branding configured are highlighted.
          </p>

          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm rounded mr-2">
              Has Branding
            </span>
            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded">
              No Branding Yet
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {clients?.map((client: Client) => {
              const hasBranding = brandedClientIds.has(client.client_id);
              return (
                <Link
                  key={client.client_id}
                  href={`/preview/${client.client_id}`}
                  className={`block p-4 rounded-lg border transition-all hover:shadow-md ${
                    hasBranding
                      ? 'bg-green-50 border-green-200 hover:border-green-400'
                      : 'bg-gray-50 border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <div className="font-medium">{client.company_name}</div>
                  <div className="text-xs text-gray-500">ID: {client.client_id}</div>
                </Link>
              );
            })}
          </div>

          {(!clients || clients.length === 0) && (
            <p className="text-gray-500 text-center py-8">
              No clients found in database.
            </p>
          )}

          <div className="mt-8 pt-6 border-t text-sm text-gray-500">
            <p><strong>Note:</strong> This preview page is for local testing only.</p>
            <p>In production, each brand is accessed via its own domain (e.g., authenticfryd.com).</p>
          </div>
        </div>
      </div>
    </main>
  );
}
