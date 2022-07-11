import useSWR from 'swr';
import axios from 'axios';
import { SetStateAction, useState } from 'react';
import ApiList from '../components/result/ApiList';
import PageNumbers from '../components/result/PageNumbers';
import listApi from '../constants/listApi';
import ApiList2 from '../components/result/ApiList2';
// import { IEntry } from '../interfaces/IApi';
// import listApi from '../components/constants/listApi';
// import ListApi2 from '../components/ListApi2';

const list = () => {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  // eslint-disable-next-line no-unused-vars
  const { data, error } = useSWR('https://api.publicapis.org/entries', fetcher);
  //   console.log(data);
  //   const apis = data || [];
  //   const apis = ListApi2;
  const [query, setQuery] = useState<any>('');
  // const apis = listApi;
  //   console.log(apis);

  // const { entries } = listApi;
  const { entries } = data ?? [];

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(20);

  const indexOfLastItem = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastItem - postPerPage;
  const currentPosts =
    entries.length > 0 ? entries?.slice(indexOfFirstPost, indexOfLastItem) : [];
  //   console.log(entries);
  //   console.count();

  const paginate = (pageNumber: SetStateAction<number>) =>
    setCurrentPage(pageNumber);

  const keys = ['Description', 'API'];
  // eslint-disable-next-line no-shadow
  const search = (data: any[]) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query))
    );
  };
  return (
    <div className="flex flex-col justify-center space-y-10 p-10">
      <input
        type="text"
        name=""
        id=""
        placeholder="Search"
        onChange={(e) => setQuery(e.target.value)}
      />
      {/* <ApiList data={apis.entries} /> */}
      {/* <ApiList data={search(apis.entries)} /> */}
      {/* <input type="number" name="" id="" /> */}
      {/* <div className="h-screen">
        <ApiList data={search(currentPosts)} />
      </div> */}
      <ApiList2 data={data?.entries ?? []} query={query} setQuery={setQuery} />
      {/* <ApiList2 data={entries} query={query} setQuery={setQuery} /> */}
      {/* <ApiList data={search(currentPosts)} /> */}
      {/* <PageNumbers
        postsPerPage={postPerPage}
        totalPosts={entries.length}
        paginate={paginate}
        currentPage={currentPage}
      /> */}
    </div>
  );
};

export default list;
