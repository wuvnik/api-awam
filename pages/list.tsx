import useSWR from 'swr';
import axios from 'axios';
import { SetStateAction, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
// import ApiList from '../components/result/ApiList';
import ApiListTable from '../components/result/ApiListTable';
import NoInternet from '../components/result/NoInternet';
import Loading from '../components/result/Loading';

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

  const [query, setQuery] = useState<any>('');
  const { entries } = data ?? [];
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(20);

  const indexOfLastItem = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastItem - postPerPage;
  const currentPosts =
    entries?.length > 0
      ? entries?.slice(indexOfFirstPost, indexOfLastItem)
      : [];

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
    <div className="bg-[#ffffff] min-h-screen">
      <nav className="flex mb-10 border-b border-black bg-[#ffffff]">
        <Link href="/">
          <div className="italic cursor-pointer border-r border-black p-5">
            <span className="font-thin">API</span>
            <span className="font-bold">AWAM</span>
          </div>
        </Link>
        <input
          type="text"
          name=""
          id=""
          placeholder="Search for public API"
          className="flex outline-none bg-transparent border-bz px-5 text-sm"
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

      <div className="px-10">
        <ApiListTable
          data={data?.entries ?? []}
          query={query}
          setQuery={setQuery}
        />
      </div>
    </div>
  );
};

export default list;
