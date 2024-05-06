import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { IListing, apiCaller } from "./utils";
import ListingCard from "./components/ListingCard/ListingCard";
import { CircularProgress } from "@mui/material";
import { useAppSelector } from "./hooks";
import { IFilters } from "./store/filtersSlice";

interface ListingProps {}

const Listing: React.FC<ListingProps> = () => {
  const filters = useAppSelector((state) => state.filters);
  const [totalCount, setTotalCount] = useState(0);
  const [listing, setListing] = useState<IListing[]>([]);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [startObserver, setStartObserver] = useState(false);

  // function to check whether to render the card or not based on applied filters
  const isFilteredItem = useCallback(
    (listItem: IListing) => {
      const appliedKeys = Object.keys(filters.appliedFilters).filter(
        (key) => filters.appliedFilters[key as keyof IFilters["appliedFilters"]]
      );
      const isFiltered = appliedKeys
        .map((item) => {
          const key = item as keyof IFilters["appliedFilters"];
          if (key === "search") {
            return listItem.companyName.toLowerCase().includes(filters.search);
          }
          if (key === "roles") {
            return filters.roles.includes(listItem.jobRole);
          }
          if (key === "locations") {
            return filters.locations.includes(listItem.location);
          }
          if (key === "experience" && filters.experience) {
            return (
              filters.experience >= (listItem.minExp || 0) &&
              filters.experience <= (listItem.maxExp || 0)
            );
          }
          if (key === "minBasePay" && filters.minBasePay) {
            return (listItem.minJdSalary || 0) >= filters.minBasePay;
          }
        })
        .every((item) => item === true);

      return isFiltered;
    },
    [filters]
  );

  /**
   * maintaining an intersection observer for infinite scroll
   * could also implement virtualisation, but we have to apply filters on the UI
   * which does not give us the actual total count or the actual result we get from the API
   * due to this implementing a virtual infinite scroll is unintuitive although we get a large list
   */
  const currentObserverRef = useRef(
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // increment page number to call the API whenever intersecting
            setPage((prev) => prev + 1);
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

  // start the observer after the initial fetch
  useEffect(() => {
    if (!observerRef.current || !startObserver) return;
    currentObserverRef.current.observe(observerRef.current);

    return () => {
      if (observerRef.current) {
        currentObserverRef.current.unobserve(observerRef.current);
      }
    };
  }, [observerRef.current, startObserver]);

  // logic for API call on page change
  useEffect(() => {
    if (isLoading || (listing.length !== 0 && listing.length >= totalCount))
      return;
    setIsLoading(true);
    apiCaller(page).then(({ jdList, totalCount }) => {
      setListing((prev) => [...prev, ...jdList]);
      setTotalCount(totalCount);
      setIsLoading(false);
      setStartObserver(true);
    });
  }, [page]);

  useEffect(() => {
    /**
     * if the observed element is still visible on the viewport after the API call, increment the page
     * needed to add this because once the listing is filtered
     * the list becomes shorter and the listing does not gets updated unless we scroll
     * or worst case we just cannot scroll, but the total count is not yet reached
     * we need to further get the data without scrolling
     */
    if (
      observerRef.current &&
      window.innerHeight >= observerRef.current.getBoundingClientRect().top &&
      startObserver
    ) {
      setTimeout(() => {
        setPage((prev) => prev + 1);
      }, 500);
    }
  }, [listing]);

  const filteredList = useMemo(() => {
    return listing.filter((list) => isFilteredItem(list));
  }, [listing, filters]);

  return (
    <div>
      <div className="listing-grid">
        {filteredList.map((list) => (
          <ListingCard listItem={list} key={list.jdUid} />
        ))}
      </div>
      {filteredList.length === 0 &&
        !isLoading &&
        listing.length >= totalCount && (
          <div style={{ textAlign: "center" }}>No results found</div>
        )}
      <div id="infinite-loader" ref={observerRef}></div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10,
        }}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <div style={{ width: 40, height: 40 }}></div>
        )}
      </div>
    </div>
  );
};

export default Listing;
