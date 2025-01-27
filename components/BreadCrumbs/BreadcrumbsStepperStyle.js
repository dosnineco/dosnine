import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiHome, FiChevronRight, FiArrowRight } from 'react-icons/fi';




// Variation 5: Stepper Style
const BreadcrumbsStepperStyle = () => {
    const router = useRouter();
    const [breadcrumbs, setBreadcrumbs] = useState([]);
  
    useEffect(() => {
      const pathArray = router.asPath.split('/').filter(path => path);
      const breadcrumbArray = pathArray.map((path, index) => {
        const href = '/' + pathArray.slice(0, index + 1).join('/');
        return { href, label: path };
      });
      setBreadcrumbs(breadcrumbArray);
    }, [router.asPath]);
  
    return (
      <nav className="text-sm">
        <ol className="flex items-center">
          <li className="flex items-center">
            <Link href="/" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
              1
            </Link>
          </li>
          {breadcrumbs.map((breadcrumb, index) => (
            <li key={index} className="flex items-center">
              <div className="h-px w-8 bg-gray-300 mx-2"></div>
              <Link 
                href={breadcrumb.href} 
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index === breadcrumbs.length - 1 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 hover:bg-blue-100'
                }`}
              >
                {index + 2}
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    );
  };

  export default BreadcrumbsStepperStyle;