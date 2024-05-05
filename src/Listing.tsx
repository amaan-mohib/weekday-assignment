import React, { useEffect, useRef, useState } from "react";
import { IListing, apiCaller } from "./utils";
import ListingCard from "./components/ListingCard/ListingCard";
import { CircularProgress } from "@mui/material";

interface ListingProps {}

const Listing: React.FC<ListingProps> = () => {
  const [totalCount, setTotalCount] = useState(0);
  const [listing, setListing] = useState<IListing[]>([]);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [startObserver, setStartObserver] = useState(false);

  const currentObserverRef = useRef(
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setPage((prev) => prev + 1);
            console.log("loading");
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      }
    )
  );

  useEffect(() => {
    if (!observerRef.current || !startObserver) return;
    currentObserverRef.current.observe(observerRef.current);

    return () => {
      if (observerRef.current) {
        currentObserverRef.current.unobserve(observerRef.current);
      }
    };
  }, [observerRef.current, startObserver]);

  useEffect(() => {
    if (isLoading || (listing.length !== 0 && listing.length >= totalCount))
      return;
    setIsLoading(true);
    apiCaller(page).then(({ jdList, totalCount }) => {
      console.log({ jdList, page });

      setListing((prev) => [...prev, ...jdList]);
      setTotalCount(totalCount);
      setIsLoading(false);
      setStartObserver(true);
    });
  }, [page]);

  return (
    <div>
      <div className="listing-grid">
        {listing.map((list) => {
          return <ListingCard listItem={list} key={list.jdUid} />;
        })}
      </div>
      <div id="infinite-loader" ref={observerRef}></div>
      {isLoading && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default Listing;
