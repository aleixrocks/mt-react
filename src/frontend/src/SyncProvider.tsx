import { createContext, useEffect, useContext,  ReactNode } from 'react';
import { useQuery } from "@tanstack/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Sync } from 'shared/dist/Sync';
import { SyncFrontendUtils } from './SyncFrontendUtils';
import { useImmer } from 'use-immer';
import { logDebug } from './logger';

const SyncContext = createContext<[Sync|null, any]>([null, null]);
const queryClient = new QueryClient();

export const enum SyncMode {
	Client = "CLIENT",
	Server = "SERVER"
}

export function useSync(): [Sync, any] {
	return useContext(SyncContext) as [Sync, any];
}

async function fetchData(): Promise<Sync|null> {
	const sync = await SyncFrontendUtils.getSync();
	logDebug("Periodic Sync");
	return sync;
};

export function SyncClientProvider({ children }: {children: ReactNode}) {
	const { data, isLoading, error } = useQuery<Sync|null>({
		queryKey: ["clientSync"],
		queryFn: fetchData,
		refetchInterval: 5000, // Refetch every 5 seconds
	});

	if (isLoading || data === null || data === undefined) {
		return (
			<div className="container">
				<h1>Loading Sync data...</h1>
			</div>
		);
	}
	if (error) return <p>Error: {error.message}</p>;

	const handleUpdateSync = (draftFunc: any) => {};

	return (
		<SyncContext.Provider value={[data, handleUpdateSync]}>
			{children}
		</SyncContext.Provider>
	);
}

export function SyncServerProvider({ children }: {children: ReactNode}) {
	const [sync, updateSync] = useImmer<Sync|null>(null);

	const handleUpdateSync = (draftFunc: any) => {
		const copy: Sync = structuredClone(sync) as Sync;
		draftFunc(copy);
		SyncFrontendUtils.setSync(copy);
		updateSync(draftFunc);
	};

	useEffect(() => {
		SyncFrontendUtils.getSync().then(sync => {
			updateSync(sync);
		});
	}, [updateSync]);

	if (sync === null) {
		return (
			<div className="container">
				<h1>Loading Sync Server data...</h1>
			</div>
		);
	}

	return (
		<SyncContext.Provider value={[sync, handleUpdateSync]}>
			{children}
		</SyncContext.Provider>
	);
}

export function SyncProvider({ children, mode }: {children: ReactNode, mode: SyncMode}) {
	const base = (mode === SyncMode.Client) ? (
		<QueryClientProvider client={queryClient}>
			<SyncClientProvider>
				{children}
			</SyncClientProvider>
		</QueryClientProvider>
	) : (
		<SyncServerProvider>
			{children}
		</SyncServerProvider>
	);

	return base;
}
