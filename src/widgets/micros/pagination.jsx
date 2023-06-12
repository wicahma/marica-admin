import {
  getItemProps,
  next,
  pageDivider,
  prev,
} from "@/context/table/pagination";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { Button, IconButton } from "@material-tailwind/react";
import React, { useEffect, useMemo } from "react";

const Pagination = ({
  identifier,
  data = () => {},
  pageData = () => {},
  activeIndex = () => {},
}) => {
  const [active, setActive] = React.useState(1);

  const pages = useMemo(() => {
    return pageData(pageDivider(data(identifier)));
  }, [data(identifier), active]);

  useEffect(() => {
    return () => {
      activeIndex(active);
    };
  }, [active]);

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        color="blue-gray"
        className="flex items-center gap-2"
        onClick={() => prev(active, (ind) => setActive(ind))}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        {pages.map((data, i) => (
          <IconButton
            {...getItemProps((i += 1), active, (ind) => setActive(ind))}
          >
            {i}
          </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        color="blue-gray"
        className="flex items-center gap-2"
        onClick={() => next(active, (ind) => setActive(ind))}
        disabled={active === 5}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
