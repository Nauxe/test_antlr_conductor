import { initialise } from "conductor/dist/conductor/runner/util/";
import { RustLikeEvaluator } from "./RustLikeEvalulator";

const {runnerPlugin, conduit} = initialise(RustLikeEvaluator);
