// components/UniversalSidebar.js
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

export default function UniversalSidebar({ 
  title,
  icon: Icon,
  items,
  position = 'left',
  footer,
  className = ''
}) {
  const router = useRouter();
  const currentPath = router.asPath;

  return (
    <motion.aside
      className={`universal-sidebar sidebar-${position} ${className}`}
      initial={{ opacity: 0, x: position === 'left' ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="sidebar-header">
        {Icon && <Icon size={24} />}
        <h2>{title}</h2>
      </div>

      <nav className="sidebar-items">
        {items.map((item) => {
          const ItemIcon = item.icon;
          const isActive = currentPath === item.href || currentPath.startsWith(item.href + '/');
          
          if (item.onClick) {
            return (
              <button
                key={item.id}
                onClick={item.onClick}
                className={`sidebar-item ${isActive ? 'active' : ''}`}
              >
                {ItemIcon && <ItemIcon size={20} />}
                <span>{item.title}</span>
              </button>
            );
          }

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
            >
              {ItemIcon && <ItemIcon size={20} />}
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {footer && (
        <div className="sidebar-footer">
          {footer}
        </div>
      )}
    </motion.aside>
  );
}
