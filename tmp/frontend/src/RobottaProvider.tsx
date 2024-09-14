import { createContext, useEffect, useState, useContext,  ReactNode } from 'react';
import { Robotta } from 'shared/dist/Robotta';
import { RobottaFrontendUtils } from './RobottaFrontendUtils';
import { useImmer } from 'use-immer';

const RobottaContext = createContext<[Robotta|null, any]>([null, null]);

export function useRobotta(): [Robotta, any] {
	return useContext(RobottaContext) as [Robotta, any];
}

export function RobottaProvider({ children }: {children: ReactNode}) {
	const [rtt, updateRtt] = useImmer<Robotta|null>(null);
	const [tokenId, setTokenId] = useState("");

	const handleUpdateRobotta = (draft: any) => {
		const copy = {...rtt};
		const updated = draft(copy);
		RobottaFrontendUtils.setRobotta(tokenId, updated);
		updateRtt(draft);
	};

	useEffect(() => {
		RobottaFrontendUtils.getCurrentTokenId().then(ti => {
			setTokenId(ti);
			return RobottaFrontendUtils.getRobotta(ti);
		}).then(rtt => {
			updateRtt(rtt);
		});
	}, []);

	if (rtt === null) {
		return (
			<div className="container">
				<h1>Loading...</h1>
			</div>
		);
	}

	return (
		<RobottaContext.Provider value={[rtt, updateRtt]}>
			{children}
		</RobottaContext.Provider>
	);
}
