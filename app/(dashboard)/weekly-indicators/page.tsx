import { KPIDashboard } from '@/components/KPIDashboard'

export default function WeeklyIndicatorsPage() {
	return (
		<div className="p-6">
			<KPIDashboard dataset="global-ops" />
		</div>
	)
}

