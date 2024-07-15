import React from 'react';

interface BreadCrumbsProps {
  crumbs: string[];
}

const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ crumbs }) => {
  return (
    <section className="overflow-hidden">
      <div className="flex items-center gap-4 p-2">
        <a className="text-white font-normal uppercase text-opacity-70 text-sm" href="#">
          Homepage
        </a>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M12.8334 8.23334L9.00841 4.40834C8.85228 4.25313 8.64107 4.16602 8.42091 4.16602C8.20076 4.16602 7.98955 4.25313 7.83341 4.40834C7.75531 4.48581 7.69331 4.57798 7.651 4.67953C7.6087 4.78108 7.58691 4.89 7.58691 5.00001C7.58691 5.11002 7.6087 5.21894 7.651 5.32049C7.69331 5.42204 7.75531 5.51421 7.83341 5.59168L11.6667 9.40834C11.7449 9.48581 11.8068 9.57798 11.8492 9.67953C11.8915 9.78108 11.9132 9.89 11.9132 10C11.9132 10.11 11.8915 10.2189 11.8492 10.3205C11.8068 10.422 11.7449 10.5142 11.6667 10.5917L7.83341 14.4083C7.67649 14.5642 7.5879 14.7759 7.58712 14.9971C7.58633 15.2182 7.67343 15.4306 7.82925 15.5875C7.98506 15.7444 8.19683 15.833 8.41797 15.8338C8.6391 15.8346 8.85149 15.7475 9.00841 15.5917L12.8334 11.7667C13.3016 11.2979 13.5645 10.6625 13.5645 10C13.5645 9.33751 13.3016 8.70209 12.8334 8.23334Z"
              fill="white"
            ></path>
          </svg>
        </span>
        <a className="text-white font-normal uppercase text-opacity-70 text-sm" href="#">
          Services
        </a>
      </div>
    </section>
  );
};

export default BreadCrumbs;
