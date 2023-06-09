import React from 'react';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import AddDish from '@components/AddDish';
import Layout from '@components/LayoutIn';

export interface RestaurantPageQuery extends ParsedUrlQuery {
  id: string;
}

const Createdish = () => {
  const router = useRouter();
  const query = router.query as RestaurantPageQuery;
  const id = parseInt(query.id);
  return (
    <Layout>
      <AddDish id={id}/>
    </Layout>
  )
}

export default Createdish
