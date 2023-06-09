import React from 'react';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';
import { Category } from '@components/Category';
import PublicLayout from '@components/PublicLayout';

export interface CategoryPageQuery extends ParsedUrlQuery {
  slug: string;
}

const CategoryPage = () => {
  const router = useRouter();
  const query = router.query as CategoryPageQuery;
  return (
    <PublicLayout>
      <Category slug={query.slug} />
    </PublicLayout>
  )
}

export default CategoryPage;
