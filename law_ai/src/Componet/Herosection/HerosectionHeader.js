import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

const HerosectionHeader = ({ folder1, folder2, name }) => {
  const backgroundImage = require('../../assets/images/pattern/05.png');

  return (
    <>
        <div className="pagger bfr bg-dark">
          <div className='container'>
          <div className="row text-white z-index-1">
            <div className="col">
              <h3 className="text-white">{name}</h3>
              <Breadcrumb className="breadcrumb bg-transparent p-0 m-0">
                <BreadcrumbItem><a className="text-white" href="/">Home</a></BreadcrumbItem>
                {folder1 && <BreadcrumbItem>{folder1}</BreadcrumbItem>}
                {folder2 && <BreadcrumbItem>{folder2}</BreadcrumbItem>}
                <BreadcrumbItem active className="text-primary">{name}</BreadcrumbItem>
              </Breadcrumb>
            </div>
          </div>
          </div>
        </div>
    </>
  );
};

export default HerosectionHeader;