import { useRef, useState } from "react"

export const InputPanel = () => {
  type citation = {
    text: string,
    source: string,
    link: string
  }
  interface responseType {
    answer: string,
    citations: citation[]
  }
  let textAreaRef = useRef(null)
  let [isLoading, setIsLoading] = useState<boolean>(false)
  let [text, setText] = useState<string>("Submit")
  let [data, setData] = useState<responseType | null>(null)
  let [input, SetInput] = useState<string>("")
  let [insert, setInsert] = useState<boolean>(false)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setInsert(true)
    setIsLoading(true)
    setText("Loading...")
    setTimeout(() => {
      const response = {
        answer: "Yes, under Section 166 of the Motor Vehicles Act, 1988, the claimants are entitled to an addition for future prospects even when the deceased was self-employed and aged 54–55 years at the time of the accident. In Dani Devi v. Pritam Singh, the Court held that 10% of the deceased’s annual income should be added as future prospects.",
        citations: [
          {
            text: "“as the age of the deceased at the time of accident was held to be about 54-55 years by the learned Tribunal, being self-employed, as such, 10% of annual income should have been awarded on account of future prospects.”",
            source: "Dani Devi v Pritam Singh",
            link: "/lexisg.pdf"
          }
        ]
      }
      setData(response)
      setText("Submit")
      setIsLoading(false)
    }, 1500)
  }
  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    SetInput(e.target.value)
  }
  return (
    <div className="w-screen flex flex-col-reverse bottom-0 absolute h-auto mb-10 items-center justify-center">
      <form onSubmit={handleSubmit} className="bottom-0 mt-6 border-1 border-gray-400 bg-gray-100 rounded-md flex justify-between p-3 w-3/5">
        <textarea
          className="focus:outline-none focus:ring-0 focus:border-transparent w-11/12 text-sm px-3 pt-3 flex items-center resize-none overflow-hidden min-h-10 max-h-24 h-auto"
          placeholder="Ask Anything"
          ref={textAreaRef}
          value={input}
          onChange={handleOnChange}
          required
        />
        <button className="bg-black text-white font-medium text-sm w-20 py-2 h-10 rounded-lg">{text}</button>
      </form>
      {isLoading && <div className="relative w-3/5 h-16 rounded bg-gray-200 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-50 animate-slide opacity-80" />
      </div>}
      {data &&
        (<div className="w-3/5 items-end flex flex-col">
          <p>{data.answer}</p>
          {
            data.citations.map((citation, index) => (
              <div className="flex flex-col" key={index}>
                <label className="font-semibold py-5">Source</label>
                <a className="text-sm/normal pl-4 border-2 border-transparent border-l-gray-200"
                  target="_blank" href={`${citation.link}#page=2`}>{citation.text}</a>
                <p className="mt-4">{citation.source}</p>
              </div>
            ))
          }
        </div>)}
      {insert &&
        (<div className="w-3/5 mb-2 flex justify-end">
          <div className="w-1/2 text-sm/normal rounded-lg bg-gray-100 m-2 p-2">{input}</div>
        </div>)
      }
    </div>
  )
}
