     <table>
      <thead>
        <tr>
          <th>Agency Name</th>
          <span>https://www.nerdwallet.com/best/loans/personal-loans/best-personal-loans</span>
        </tr>
      </thead>
      <tbody>
        {banks.map(bank => (
          <tr key={bank.loanid}>
            <td>{bank.agencyname}</td>
            <td>{bank.loantype}</td>
            <td>{bank.interestrate}</td>
            <td>{bank.maxamount}</td>
            <td>{bank.minamount}</td>
            <td>{bank.requirements}</td>
          </tr>
        ))}
      </tbody>
    </table>



        <div className={styles.servicesGrid}>
      {services.map((service, index) => (
        <ol className={styles.serviceItem} key={index}>
        <li>
          <h3>{service.title}</h3>
          <p>{service.description}</p>
          </li>
        </ol>
      ))}
    </div>



      const [banks, setBanks] = useState([]);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await fetch('/api/loan');
        const data = await response.json();
        setBanks(data.loan.rows);
        console.log(data.loan);
      } catch (error) {
        console.error("Error fetching banks:", error);
      }
    };

    fetchBanks();
  }, []);
