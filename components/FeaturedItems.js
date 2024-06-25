// components/FeaturedItems.
import styles from './styles/FeaturedItems.module.css'

const featuredItems = [
    "Website Template",
    "Analytics",
    "Contact Form",
    "Search Engine Optimization",
    "Deployment And Configuration",
    "And More..."
  ];
  
  const FeaturedItems = () => {
    return (
      <div className={styles.featured_items_container}>
        <h2>Features By default:</h2>
        <div className={styles.featured_items_list}>
          {featuredItems.map((item, index) => (
            <div className={styles.featured_item} key={index}>
              <span className={styles.check_icon}>✔️</span> {item}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default FeaturedItems;
  