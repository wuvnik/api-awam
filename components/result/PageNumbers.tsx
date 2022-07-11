import { useState } from 'react';

const PageNumbers = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
}: any) => {
  const pageNumbers = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  // eslint-disable-next-line consistent-return
  const getPaginationGroup = () => {
    // const start = Math.floor((currentPage - 1) / 4) * 4;
    // return new Array(4).fill().map((_, i) => start + i + 1);

    const paginatorSize = 5;
    // const start = Math.floor((currentPage - 1) / paginatorSize) * paginatorSize;
    // const startNumber = start > 0 ? start : 1;
    // const pageStart = currentPage - Math.ceil(paginatorSize / 2);
    // const validPageStart = pageStart > 1 ? pageStart : 1;
    // // return new Array(paginatorSize).fill().map((_, i) => pageStart + 1 )
    // console.log(startNumber, pageStart, validPageStart)

    const steps = Math.floor(paginatorSize / 2);
    const pageStart = currentPage - steps;
    // const validPageStart = pageStart === -2 ? 1 : pageStart;
    const validPageStart = pageStart - 0;
    // console.log(validPageStart);
    // console.log(
    //   Array(paginatorSize)
    //     .fill()
    //     .map((_, i) => validPageStart + i + 1)
    // );

    const c = currentPage;
    const Arr = [];
    Arr.push(c - 2);
    Arr.push(c - 1);
    Arr.push(c);
    Arr.push(c + 1);
    Arr.push(c + 2);
    // return Arr.filter((i) => i > 0);
    // const start = Math.floor((c - 1) / 4) * 4;
    // return new Array(4).fill().map((_, i) => start + i + 1);
    // return [1,2,3]
    if (currentPage < 4) {
      return new Array(paginatorSize)
        .fill()
        .map((_, i) => 1 + i)
        .slice(0, pageNumbers.length);
    }

    if (currentPage >= 4) {
      if (currentPage >= pageNumbers.length - 2) {
        const lastP = pageNumbers.length - 5;
        return new Array(paginatorSize).fill().map((_, i) => lastP + i + 1);
      }
      return new Array(paginatorSize)
        .fill()
        .map((_, i) => validPageStart + i + 0);
      //   .filter((i) => i > 0);
    }

    // if (currentPage > (pageNumbers.length - 3 )) {
    // // if (currentPage === 7) {
    //   const last = currentPage;
    //   return new Array(paginatorSize).fill().map((_, i) => last + i + 1);
    // }

    // return new Array(paginatorSize)
    //   .fill()
    //   .map((_, i) => validPageStart + i + 0);
    // //   .filter((i) => i > 0);
  };

  const [pageGroup, setPageGroup] = useState(getPaginationGroup());
  //   console.log(pageNumbers, pageNumbers.length);
  //   useEffect(() => {
  //   }, [currentPage])
  //   console.log(getPaginationGroup());
  const handlePage = (number: number) => {
    paginate(number);
  };
  return (
    <nav className="absolutebottom-5left-1/2-translate-x-1/2 mx-autoright--0left-0 transformtranslate-x-1/2 flex justify-center">
      <ul className="pagination flex gap-5">
        {/* {pageNumbers.map((number) => (
          <li key={number}>
            <button
              type="submit"
              // onClick={() => paginate(number)}
              onClick={() => handlePage(number)}
            >
              {number}
            </button>
          </li>
        ))} */}
        {getPaginationGroup().map((number) => (
          <li key={number}>
            <button
              type="submit"
              className={`f ${
                number === currentPage
                  ? 'text-white bg-black px-3 rounded-full'
                  : ''
              } `}
              // onClick={() => paginate(number)}
              onClick={() => handlePage(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PageNumbers;
