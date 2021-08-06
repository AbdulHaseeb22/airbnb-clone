import { format } from "date-fns";
import { useRouter } from "next/dist/client/router"
import Footer from "../components/Footer"
import Header from "../components/Header"
import InfoCard from "../components/InfoCard";

function Search({searchResults}) {

    const router = useRouter();

    //Destructuring
    const {location, startDate, endDate, numberOfGuests } = router.query;

    const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
    const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
    const range = `${formattedStartDate} - ${formattedEndDate}`;

    const placeholder = `${location} | ${range} | ${numberOfGuests} guests`
    return (
        <div className>
            <Header pHolder = {placeholder}/>

            <main className="flex pt-14 px-6">
                <section>
                    <p className="text-xs">300+ stays  {range}  for {numberOfGuests} number of guests</p>
                    <h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {location}</h1>

                    <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
                        <p className="button">Calcellation Flexibility</p>
                        <p className="button">Type of place</p>
                        <p className="button">Price</p>
                        <p className="button">Rooms and Beds</p>
                        <p className="button">More Filters</p>
                    </div>

                    <div className="flex flex-col">
                    {searchResults?.map(({img, location, title, description, star, price, total}) => (
                        <InfoCard 
                        key={img}
                        img={img}
                        location={location}
                        title={title}
                        description={description}
                        star={star}
                        price={price}
                        total={total}
                        />
                    ))}
                    </div>
                </section>
            </main>





            <Footer />
        </div>
    )
}

export default Search


export async function getServerSideProps() {
    const searchResults = await fetch("https://links.papareact.com/isz").
    then(
        (res) => res.json()
    );

    return {
        props: {
            searchResults
        }
    }
}