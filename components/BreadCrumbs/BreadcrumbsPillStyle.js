import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';


// Variation 3: Pill Style Breadcrumbs
const BreadcrumbsPillStyle = () => {
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
        <ol className="flex space-x-2">
          <li>
            <Link href="/" className="bg-gray-100 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors">
              Home
            </Link>
          </li>
          {breadcrumbs.map((breadcrumb, index) => (
            <li key={index} className="flex items-center">
              <span className="text-gray-300">/</span>
              <Link 
                href={breadcrumb.href} 
                className="ml-2 bg-gray-100 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
              >
                {breadcrumb.label}
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    );
  };
  
  export default  BreadcrumbsPillStyle;