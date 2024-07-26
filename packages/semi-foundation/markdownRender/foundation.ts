import BaseFoundation, { DefaultAdapter } from '../base/foundation';
import { CompileOptions, evaluate, compile, EvaluateOptions, evaluateSync, RunOptions } from '@mdx-js/mdx';
import { MDXProps } from 'mdx/types';
import remarkGfm from 'remark-gfm';
export interface MarkdownRenderAdapter <P = Record<string, any>, S = Record<string, any>> extends DefaultAdapter<P, S> {
    getRuntime: () => any

}




export interface MarkdownRenderBaseProps{
    raw: string;
    components: MDXProps['components'];
    format: "md"|"mdx"
}


export interface MarkdownRenderBaseState{
    MDXContentComponent: any
}

class MarkdownRenderFoundation extends BaseFoundation<MarkdownRenderAdapter> {

    private getOptions = ()=>{
        return {
            evaluateOptions: {
                remarkPlugins: [remarkGfm],
                format: this.getProp("format")
            },
            compileOptions: {
                format: this.getProp("format")
            },
            runOptions: {
            }
        } as {
            evaluateOptions: EvaluateOptions;
            compileOptions: CompileOptions;
            runOptions: RunOptions
        };
    }

    compile = async (mdxRaw: string)=>{
        return await compile(mdxRaw, this.getOptions().compileOptions);
    }

    evaluate = async (mdxRaw: string)=>{
        return (await evaluate(mdxRaw, {
            ...this.getOptions().runOptions,
            ...this.getOptions().evaluateOptions,
            ...this._adapter.getRuntime()
        })).default;
    }

    evaluateSync = (mdxRaw: string)=>{
        return ( evaluateSync(mdxRaw, {
            ...this.getOptions().runOptions,
            ...this.getOptions().evaluateOptions,
            ...this._adapter.getRuntime()
        })).default;
    }



}

export default MarkdownRenderFoundation;
