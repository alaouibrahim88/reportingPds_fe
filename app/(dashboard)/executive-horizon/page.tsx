import { ExecutiveHorizonContent } from './executive-horizon-content'

export default function ExecutiveHorizon() {
	return (
		<div className="min-h-screen">
			<div className="flex flex-col gap-4 p-4 max-w-[2000px] mx-auto">
				<ExecutiveHorizonContent />
			</div>
		</div>
	)
}
