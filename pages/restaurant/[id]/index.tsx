import React from 'react';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';
import PublicLayout from '@components/PublicLayout';
import SingleRestaurant from '@components/SinglePage';

export interface RestaurantPageQuery extends ParsedUrlQuery {
  id: string;
}

const RestaurantPage = () => {
  const router = useRouter();
  const query = router.query as RestaurantPageQuery;
  const id = parseInt(query.id);
  return (
    <PublicLayout>
      <SingleRestaurant id={id} />
    </PublicLayout>
  )
}

export default RestaurantPage;
