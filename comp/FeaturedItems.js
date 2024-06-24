// components/FeaturedItems.
import styles from './styles/FeaturedItems.module.css'

const featuredItems = [
    "Hot Tub Removal",
    "Sofa Removal",
    "Storage Unit Cleanout",
    "Dryer Removal",
    "Garage Cleanout",
    "And More..."
  ];
  
  const FeaturedItems = () => {
    return (
      <div className={styles.featured_items_container}>
        <h2>Featured Items We Remove:</h2>
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
  