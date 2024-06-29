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
    <div style={{ textAlign: 'left', paddingLeft: '20px', paddingBottom: '12px' }}>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize="small" />}
      >
        <Link color="inherit" href="/" sx={{ display: 'flex', alignItems: 'center' }}>
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Produtos
        </Link>

        {searchValue && <Typography color="inherit">{searchValue}</Typography>}

        {selectedCategoryName && (
          <Typography color="inherit">
            {selectedCategoryName} / {selectedSubCategoryName}
          </Typography>
        )}
      </Breadcrumbs>
    </div>
  );
};

export default CategoryBreadcrumbs;
