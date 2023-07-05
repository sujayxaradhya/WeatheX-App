declare function useNavigate(): NavigateFunction;

interface NavigateFunction {
	(
		to: To,
		options?: {
			replace?: boolean;
			state?: any;
			relative?: RelativeRoutingType;
		}
	): void;
	(delta: number): void;
}
