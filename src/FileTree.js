import React, { useState } from 'react';

function Directory(props) {
    return <h2 style={{color:"red"}}> {props.name}</h2>
}

function File(props) {
    return <h5 style={{color:"blue"}}>{props.name}</h5>
}

const FileTree = (props)=>{
    const [expandedFolders, setExpandedFolders] = useState([])

    const toggleFolder = (folderName) =>{
        if (expandedFolders.includes(folderName)){
            setExpandedFolders(expandedFolders.filter((folder)=> folder !==folderName))
        }else{
            setExpandedFolders([...expandedFolders,folderName])
        }
    }
    const renderNode = (node)=>(
        <div style={{ paddingLeft: 10}} key={node.name}>
            {node.type==='file'?
            (<File name={node.name}>{node.name}</File>):
            (<div data-testid="node">
                <span onClick={()=>toggleFolder(node.name)}>
                  <Directory name={node.name} data-testid="dir-expand">
                    {node.name}
                  </Directory>
                </span>
                {expandedFolders.includes(node.name)  && node.children && node.children.map(renderNode)}
            </div>)
            }
        </div>
    )
    return <div>{[props.data].map(renderNode)}</div>
}

export default FileTree