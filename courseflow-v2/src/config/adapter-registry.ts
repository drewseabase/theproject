import type { LMSAdapter } from "../adapters/lms-adapter.interface.js";
import { MockAdapter } from "../adapters/mock/mock-adapter.js";

export function getAdapter(): LMSAdapter{
    const provider = process.env.LMS_PROVIDER;

    switch(provider){

        case "mock":
            return new MockAdapter();
        
        case "canvas":
            //return new CanvasAdapter();
            throw new Error(
                "CanvasAdapter is not yet implemented."
            );

        case "d2l":
            //return new D2LAdapter();
            throw new Error(
                "D2LAdapter is not yet implemented."
            );

        case undefined: 
            throw new Error(
                "LMS_PROVIDER not set" + 
                "Add LMS_PROVIDER=mock to .env file"
            );

        default:
            throw new Error(
                `Unknown LMS provider : "${provider}". ` + 
                `Valid options are : "mock", "canvas", "d2l".`
            );
    }
}