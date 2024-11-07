import { useEffect } from "react"
import { MathJax, MathJaxContext } from "better-react-mathjax"


export default function MathDisplay ({formula}) {
    useEffect(() => {}, []);

    return (
        <MathJaxContext>
            <MathJax>{`\\(${formula}\\)`}</MathJax>
        </MathJaxContext>
    )
}
