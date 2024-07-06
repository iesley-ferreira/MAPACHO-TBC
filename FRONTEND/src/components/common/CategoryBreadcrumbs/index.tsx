import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

type CategoryBreadcrumbsProps = {
  selectedCategoryName?: string | null;
  selectedSubCategoryName?: string | null;
  searchValue?: string | null;
  selectedCategoryId?: string | null;
};

const CategoryBreadcrumbs: React.FC<CategoryBreadcrumbsProps> = ({
  selectedCategoryName,
  selectedSubCategoryName,
  searchValue,
}) => {
  return (
    <div className="text-left pl-5 pb-8 md:pb-4">
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize="large" />}
      >
        <Link
          color="inherit"
          href="/"
          sx={{ display: 'flex', alignItems: 'center', fontSize: '1.3rem' }}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="medium" />
          Home
        </Link>

        {searchValue && <Typography color="inherit">{searchValue}</Typography>}

        {selectedCategoryName && (
          <Typography color="inherit" style={{ fontSize: '1.3rem' }}>
            {selectedCategoryName} / {selectedSubCategoryName}
          </Typography>
        )}
      </Breadcrumbs>
    </div>
  );
};

export default CategoryBreadcrumbs;
