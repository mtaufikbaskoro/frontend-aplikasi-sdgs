import goals from '@/app/data/goals.json';
import Navbar from '@/components/Navbar';

const getGoal = (goalName) => {
    return goals.filter((goal) => goalName === goal.name.toLowerCase().replace(/\s+/g, '-'))
}

export default function Metadata ({params}) {
    const { slug } = params;
    const goal = getGoal(slug);
    
    return (
        <div>
            <Navbar color={goal[0].color} />
            <div>{goal[0].color}</div>
        </div>
    )
}
