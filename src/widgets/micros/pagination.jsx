import {
  getItemProps,
  next,
  prev
} from "@/context/table/pagination";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { Button, IconButton } from "@material-tailwind/react";
import React, { useEffect } from "react";

const Pagination = ({
  identifier,
  pages = () => {},
  activeIndex = () => {},
}) => {
  const [active, setActive] = React.useState(1);

  useEffect(() => {
    activeIndex(active);
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
        {[...Array(pages(identifier)).keys()].map((_, i) => (
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
        disabled={active === pages(identifier)}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
