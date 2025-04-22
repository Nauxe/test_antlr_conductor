import { initialise } from "conductor/dist/conductor/runner/util/";
import { RustLikeEvaluator } from "./RustLikeEvaluator";

const { runnerPlugin, conduit } = initialise(RustLikeEvaluator);
