import useSWR from 'swr';
import axios from 'axios';
import { SetStateAction, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ApiList from '../components/result/ApiList';
import PageNumbers from '../components/result/PageNumbers';
import listApi from '../constants/listApi';
import ApiList2 from '../components/result/ApiList2';
import NoInternet from '../components/result/NoInternet';
import Loading from '../components/result/Loading';
// import { IEntry } from '../interfaces/IApi';
// import listApi from '../components/constants/listApi';
// import ListApi2 from '../components/ListApi2';

const list = () => {
  const router = useRouter();
  const desc = router?.query?.description;
  const [searchTerm, setSearchTerm] = useState<string | undefined | any>('');

  useEffect(() => {
    if (router.isReady) setSearchTerm(desc);
  }, [router.query]);

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = () => {
    router.push({
      pathname: '/list',
      query: { description: searchTerm },
    });
  };

  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  // eslint-disable-next-line no-unused-vars
  const { data, error } = useSWR(
    `https://api.publicapis.org/entries?description=${desc}`,
    fetcher
    // {
    //   refreshInterval: 5000,
    // }
  );
  //   console.log(data);
  //   const apis = data || [];
  //   const apis = ListApi2;
  const [query, setQuery] = useState<any>('');
  // const apis = listApi;
  //   console.log(apis);
  // console.log(desc, error);
  // const { entries } = listApi;
  const { entries } = data ?? [];

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(20);

  const indexOfLastItem = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastItem - postPerPage;
  const currentPosts =
    entries?.length > 0
      ? entries?.slice(indexOfFirstPost, indexOfLastItem)
      : [];
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

  if (error?.code === 'ERR_NETWORK' && !data) return <NoInternet />;
  if (!error && !data) return <Loading />;
  return (
    <div className="flexflex-coljustify-centerspace-y-10p-10 bg-primary/400zz bg-[#E0E1EB]zz bg-[#ffffff] flexflex-colh-full min-h-screen">
      <nav className="flex justify-aroundzz justify-betweenz mb-10 p-5z borderz border-b border-black bg-[#ffffff]">
        <Link href="/">
          <div className="w-2/6z w-1/4z pr-5z italic cursor-pointer border-r border-black p-5">
            <span className="font-thin">API</span>
            <span className="font-bold">AWAM</span>
          </div>
        </Link>
        <input
          type="text"
          name=""
          id=""
          placeholder="Search for public API"
          className="flex w-fullz outline-none bg-transparent border-bz px-5 text-sm"
          // onChange={(e) => setQuery(e.target.value)}
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit();
            }
          }}
        />
      </nav>

      {/* <ApiList data={apis.entries} /> */}
      {/* <ApiList data={search(apis.entries)} /> */}
      {/* <input type="number" name="" id="" /> */}
      {/* <div className="h-screen">
        <ApiList data={search(currentPosts)} />
      </div> */}
      <div className="px-10">
        <ApiList2
          data={data?.entries ?? []}
          query={query}
          setQuery={setQuery}
        />
      </div>
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
