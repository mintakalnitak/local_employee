import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Categories } from '../components/Categories';
import { EmployeeList } from '../components/EmployeeList';
import { EmployeeProfile } from '../components/EmployeeProfile';
import { FilterBar } from '../components/FilterBar';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

interface Employee {
    id: string;
    name: string;
    profession: string;
    location: string;
    phone: string;
    email: string | null;
    rating: number;
    skills: string[];
    availability: string;
    photo_url: string | null;
    description: string;
    experience_years: number;
}

export function Home() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<'rating' | 'name'>('rating');
    const [selectedLocation, setSelectedLocation] = useState('');

    const locations = [...new Set(employees.map((emp) => emp.location))];

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'employees'));
                const employeesList: Employee[] = [];
                querySnapshot.forEach((doc) => {
                    employeesList.push({ id: doc.id, ...doc.data() } as Employee);
                });
                setEmployees(employeesList);
            } catch (error) {
                console.error("Error fetching employees: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    useEffect(() => {
        filterAndSortEmployees();
    }, [employees, searchQuery, sortBy, selectedLocation]);

    const filterAndSortEmployees = () => {
        let filtered = [...employees];

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (emp) =>
                    emp.name.toLowerCase().includes(query) ||
                    emp.profession.toLowerCase().includes(query) ||
                    emp.skills.some((skill) => skill.toLowerCase().includes(query))
            );
        }

        if (selectedLocation) {
            filtered = filtered.filter((emp) => emp.location === selectedLocation);
        }

        filtered.sort((a, b) => {
            if (sortBy === 'rating') {
                return b.rating - a.rating;
            }
            return a.name.localeCompare(b.name);
        });

        setFilteredEmployees(filtered);
    };

    const handleCategorySelect = (category: string) => {
        setSearchQuery(category);
    };

    const handleViewProfile = (id: string) => {
        setSelectedEmployee(id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCloseProfile = () => {
        setSelectedEmployee(null);
    };

    const handleLocationChange = (location: string) => {
        setSelectedLocation(location);
    };

    if (selectedEmployee) {
        return (
            <div className="min-h-screen">
                <EmployeeProfile employeeId={selectedEmployee} onClose={handleCloseProfile} />
            </div>
        );
    }

    return (
        <div className="flex flex-col flex-1 relative z-10">
            <Header onSearch={setSearchQuery} searchQuery={searchQuery} />

            <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
                <Hero onSearch={setSearchQuery} searchQuery={searchQuery} />

                {!searchQuery && <Categories onSelectCategory={handleCategorySelect} />}

                <main className="py-8 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                    <FilterBar
                        sortBy={sortBy}
                        onSortChange={setSortBy}
                        totalResults={filteredEmployees.length}
                        locations={locations}
                        selectedLocation={selectedLocation}
                        onLocationChange={handleLocationChange}
                    />

                    <EmployeeList
                        employees={filteredEmployees}
                        loading={loading}
                        onViewProfile={handleViewProfile}
                    />
                </main>
            </div>
        </div>
    );
}
