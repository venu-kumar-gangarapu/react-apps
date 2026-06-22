import './filter.css'
export default function Filter() {
    return (
        <div className="filters-container p-56 mt-4">
            <button className="filter-btn">
                <span className="icon">⚙</span>
                Filters
            </button>

            <button className="filter-btn">Offers</button>
            <button className="filter-btn">Rating: 4.5+</button>
            <button className="filter-btn">Pet friendly</button>
            <button className="filter-btn">Outdoor seating</button>
            <button className="filter-btn">Serves Alcohol</button>
            <button className="filter-btn">Open Now</button>
        </div>
    )
}