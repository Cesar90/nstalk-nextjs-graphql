import React from 'react';
import Layout from '@components/LayoutIn';
import MyRestaurant from '@components/MyRestaurant';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';

export interface RestaurantPageQuery extends ParsedUrlQuery {
  id: string;
}

const DetailPage = () => {
  const router = useRouter();
  const query = router.query as RestaurantPageQuery;
  const id = parseInt(query.id);
  return (
    <Layout>
      <MyRestaurant id={id} />
    </Layout>
  )
}

export default DetailPage;
