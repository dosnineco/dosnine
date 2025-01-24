import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Breadcrumbs = () => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    const pathArray = router.asPath.split('/').filter((path) => path);
    const breadcrumbArray = pathArray.map((path, index) => {
      const href = '/' + pathArray.slice(0, index + 1).join('/');
      return { href, label: path };
    });

    setBreadcrumbs(breadcrumbArray);
  }, [router.asPath]);

  return (
    <nav className="mb-3  border-y p-2 px-10 mx-5">
      <ol className="list-none flex p-0 space-x-2">
        <li>
          <Link href="/" className="mx-1 text-inherit ">
            Home
          </Link>
        </li>
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index} className="flex text-inherit items-center">
            <span className="mx-1 text-inherit">/</span>
            <Link href={breadcrumb.href} className="text-inherit ">
              {breadcrumb.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;