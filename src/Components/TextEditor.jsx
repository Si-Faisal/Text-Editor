import React, { useEffect, useRef, useState } from 'react';
import { FaBold } from "react-icons/fa";
import { GrItalic } from "react-icons/gr";
import { FaUnderline } from "react-icons/fa";
import { FaAlignLeft } from "react-icons/fa6";
import { FaAlignRight } from "react-icons/fa6";
import { FaAlignCenter } from "react-icons/fa6";
import { RxLetterCaseCapitalize } from "react-icons/rx";
import { RxLetterCaseLowercase } from "react-icons/rx";
import { RxLetterCaseUppercase } from "react-icons/rx";
import { IoIosUndo } from "react-icons/io";
import { IoIosRedo } from "react-icons/io";
import TenyReact from './TenyReact';



const TextEditor = () => {

  const [selectedText, setSelectedText] = useState('');
  const [alignment, setAlignment] = useState('left');
  const [fontSize, setFontSize] = useState('16px');
  const [fontBold,setFontBold] = useState(false);
  const [fontColor, setFontColor] = useState('#9333ea');
  const [isitalic , setItalic] = useState(false);
  const [isunderline , setUnderline] = useState(false);
  const contentEditable = useRef(null);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);



  useEffect(() => {
    if (contentEditable.current) {
      contentEditable.current.focus();
    }
  }, []);

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      contentEditable.current.innerHTML = history[historyIndex - 1];
    }
  };
  

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      contentEditable.current.innerHTML = history[historyIndex + 1];
    }
  };

  const updateHistory = () => {
    const updatedHistory = [...history.slice(0, historyIndex + 1), contentEditable.current.innerHTML];
    setHistory(updatedHistory);
    setHistoryIndex(updatedHistory.length - 1);
  };

  const applyTextTransformation = (transformationType) => {
    const selection = window.getSelection();
  if (selection && selection.toString().length > 0) {
    let transformedText = '';

    switch (transformationType) {
      case 'capitalize':
        transformedText = selectedText.toUpperCase();
        break;
      case 'lowercase':
        transformedText = selectedText.toLowerCase();
        break;
      case 'uppercase':
        transformedText = selectedText.toUpperCase();
        break
        
          default:
            break;
    }

    let replace = document.createElement('span');
    replace.innerHTML = transformedText;

    replaceSelection(replace.outerHTML, true);
  }
  updateHistory();
  };


 const  handleItalic = ()=>{
    setItalic(!isitalic);
  }

 const handleUnderline = ()=>{
    setUnderline(!isunderline);
  }


    const applyFontColor = (color) => {
        const sel = getSelection().toString().length;
        if(sel > 0){
            console.log(selectedText)
            let replace = document.createElement('span');
            replace.style.color = color;
            replace.textContent = window.getSelection().toString();
            replaceSelection(replace.outerHTML, true);
        }else{
            setFontColor(color);
        }
        
      };
 

    const handleTextSelection = () => {
        const selection = window.getSelection();
        if (selection && selection.toString().length > 0) {
          setSelectedText(selection.toString());
        } else {
          setSelectedText('');
        }
      };

      const handleFontBold =()=>{
        setFontBold(!fontBold)
      }
    
      const applyAlignment = (alignment) => {
        
        setAlignment(alignment);
    
      };
    
      const applyFontSize = (fontSize) => {
    
        setFontSize(fontSize + 'px');
        const changedsize = fontSize + 'px';
        let replace = document.createElement('span');
            replace.style.fontSize = changedsize;
            replace.textContent = window.getSelection().toString();
            replaceSelection(replace.outerHTML, true);
        
      };
    
      

    const replaceSelection = (html, selectInserted) =>{
        var selection, range, fragment;    
        selection = window.getSelection();
        
        
        if (selection.getRangeAt && selection.rangeCount) {
            range = window.getSelection().getRangeAt(0);
            range.deleteContents();
            
            if (range.createContextualFragment) {
                fragment = range.createContextualFragment(html);
            } else {
               
                var div = document.createElement("div"), child;
                div.innerHTML = html;
                fragment = document.createDocumentFragment();
                while ( (child = div.firstChild) ) {
                    fragment.appendChild(child);
                }
            }
            var firstInsertedNode = fragment.firstChild;
            var lastInsertedNode = fragment.lastChild;
            range.insertNode(fragment);
            if (selectInserted) {
                if (firstInsertedNode) {
                    range.setStartBefore(firstInsertedNode);
                    range.setEndAfter(lastInsertedNode);
                }
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }
    }

    return (<>
       <div className='flex flex-col-reverse rounded-lg md:flex-row w-3/4 gap-0 md:gap-3 mx-auto mt-12 p-1 bg-green-900'>
            <div className='  md:w-3/5'> 
            
            <div className='flex gap-6 justify-center items-center justify-self-center'>
            <div className=''>
            <button className="btn text-xl mr-2" onClick={handleUndo} title='Undo' ><IoIosUndo /></button><button onClick={handleRedo} className="btn text-xl" title='Redo' ><IoIosRedo />
          </button> 
            </div>

            <div>
            <label className='p-3 text-red-300' htmlFor="fontsize">Font Size</label>
            <input onChange={(e) => applyFontSize(e.target.value)}  className="border-none outline-none p-1 rounded w-16 h-12 " type="number" defaultValue="16" name="" id="font-size" />
            </div>

            <div className='flex justify-center items-center justify-self-center'>
            <label className='p-3 text-red-300' htmlFor="fontsize">Font Color</label>
            <input onChange={(e) => applyFontColor(e.target.value)} className="border-none outline-none p-1 rounded w-16 h-12 " type="color" defaultValue="#9333ea" name="" id="font-color" />
            </div>
            </div>



            <div 
            contentEditable="true"
            ref={contentEditable}
            onSelect={handleTextSelection} 
            className="contentEditable textarea min-h-96 border-neutral-900 focus:outline-0 focus:border-stone-500 outline-2 bg-green-100 border-2 w-full" placeholder="Type here"
            style={{ fontSize, textDecoration : isunderline ? "underline" : "" ,fontStyle:isitalic? "italic" : "normal" , fontWeight: fontBold ? 'bold' : 'normal', color: fontColor, textAlign: alignment }}
            >

            </div>
            </div>
            <div className='w-full rounded-lg py-6 mt-7 md:w-2/5'>
               <div className='w-full  p-2 bg-green-100 grid grid-cols-4 gap-2 md:gap-4'>
               <button className="btn text-xl" onClick={()=>handleFontBold()} title="Font Bold"><FaBold /></button>
               <button className="btn text-xl" onClick={() => handleItalic()}  title='italic'><GrItalic /></button>
               <button className="btn text-xl" onClick={() => handleUnderline()}  title='underline'><FaUnderline /></button>
               <button className="btn text-xl" title="left align"  onClick={() => applyAlignment('left')} ><FaAlignLeft /></button>
               <button className="btn text-xl" title="Right align" onClick={() => applyAlignment('right')} ><FaAlignRight /></button>
               <button  onClick={() => applyAlignment('center')} className="btn text-xl" title='center align'><FaAlignCenter /></button>
               <button className="btn text-xl" title='Capitalize' onClick={() => applyTextTransformation('capitalize')}><RxLetterCaseCapitalize /></button>
               <button className="btn text-xl" title='ToLowerCase' onClick={() => applyTextTransformation('lowercase')} ><RxLetterCaseLowercase /></button>
               <button className="btn text-xl" onClick={() => applyTextTransformation('uppercase')}  title='ToUpperCase' ><RxLetterCaseUppercase /></button>
               
               </div>

              
            </div>
            
            
        </div>
        <div>
          <TenyReact></TenyReact>
        </div>


    </>

        
    );
};

export default TextEditor;