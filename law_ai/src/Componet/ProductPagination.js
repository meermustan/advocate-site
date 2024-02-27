import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'; 
const ProductPagination = ({ activePage, totalPages, onPageChange }) => {
  const renderPaginationItems = () => {
    const items = [];

    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <PaginationItem key={i} active={i === activePage}>
          <PaginationLink onClick={() => onPageChange(i)}>{i}</PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <Pagination aria-label="Products Pagination">
      {renderPaginationItems()}
    </Pagination>
  );
};

export default ProductPagination;
