import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { columns } from '@/components/tables/employee-tables/columns';
import { CustomerTable } from '@/components/tables/employee-tables/customer-table';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { CustomerProps } from '@/types';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Employee', link: '/dashboard/employee' }
];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function Customer({ searchParams }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const name = searchParams.search || null;
  const offset = (page - 1) * pageLimit;

  const res = await fetch(
    `http://localhost:3000/api/customer?search=${name}&offset=${offset}`
  );

  const customerRes = await res.json();
  const totalUsers = customerRes.count; //1000
  const pageCount = Math.ceil(totalUsers / pageLimit);
  const customer: CustomerProps[] = customerRes.customers;
  return (
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Customer (${totalUsers})`}
            description="Manage customers (Server side table functionalities.)"
          />

          <Link
            href={'/dashboard/employee/new'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />

        <CustomerTable
          searchKey="name"
          pageNo={page}
          columns={columns}
          totalUsers={totalUsers}
          data={customer}
          pageCount={pageCount}
        />
      </div>
    </PageContainer>
  );
}
