import { getBoardCell, getBoardHeight, getBoardWidth } from "./board";

export function generatePolyominos(polyominos) {
  const bag = generateBag();
  const save = {
    "SaveName": "",
    "Date": "",
    "VersionNumber": "",
    "GameMode": "",
    "GameType": "",
    "GameComplexity": "",
    "Tags": [],
    "Gravity": 0.5,
    "PlayArea": 0.5,
    "Table": "",
    "Sky": "",
    "Note": "",
    "TabStates": {},
    "LuaScript": "",
    "LuaScriptState": "",
    "XmlUI": "",
    "ObjectStates": []
  };
  const polyominoObjects = polyominos.map(({ cells, center }) => generatePolyomino(cells, center))
  bag.ContainedObjects = polyominoObjects;
  save.ObjectStates.push(bag);
  return save;
}

function generateBag() {
  return {
    "GUID": "c6dda4",
    "Name": "Bag",
    "Transform": {
      "posX": 2.715774,
      "posY": 0.774967551,
      "posZ": -6.26143026,
      "rotX": 7.895238E-05,
      "rotY": -1.04587325E-05,
      "rotZ": -9.846752E-06,
      "scaleX": 1.0,
      "scaleY": 1.0,
      "scaleZ": 1.0
    },
    "Nickname": "",
    "Description": "",
    "GMNotes": "",
    "AltLookAngle": {
      "x": 0.0,
      "y": 0.0,
      "z": 0.0
    },
    "ColorDiffuse": {
      "r": 0.7058823,
      "g": 0.366520882,
      "b": 0.0
    },
    "LayoutGroupSortIndex": 0,
    "Value": 0,
    "Locked": false,
    "Grid": true,
    "Snap": true,
    "IgnoreFoW": false,
    "MeasureMovement": false,
    "DragSelectable": true,
    "Autoraise": true,
    "Sticky": true,
    "Tooltip": true,
    "GridProjection": false,
    "HideWhenFaceDown": false,
    "Hands": false,
    "MaterialIndex": -1,
    "MeshIndex": -1,
    "Number": 0,
    "Bag": {
      "Order": 0
    },
    "LuaScript": "",
    "LuaScriptState": "",
    "XmlUI": "",
    "ContainedObjects": []
  }
}

function generatePolyomino(cells, center) {
  const newPolyomino = {
    "GUID": "c72fab",
    "Name": "Custom_Model",
    "Transform": {
      "posX": 0.0,
      "posY": 1.5,
      "posZ": 0.0,
      "rotX": 0.0,
      "rotY": 0.0,
      "rotZ": 0.0,
      "scaleX": 1.0,
      "scaleY": 1.0,
      "scaleZ": 1.0
    },
    "Nickname": "",
    "Description": "",
    "GMNotes": "",
    "AltLookAngle": {
      "x": 0.0,
      "y": 0.0,
      "z": 0.0
    },
    "ColorDiffuse": {
      "r": 0.0,
      "g": 1.0,
      "b": 0.0
    },
    "LayoutGroupSortIndex": 0,
    "Value": 0,
    "Locked": false,
    "Grid": true,
    "Snap": true,
    "IgnoreFoW": false,
    "MeasureMovement": false,
    "DragSelectable": true,
    "Autoraise": true,
    "Sticky": true,
    "Tooltip": true,
    "GridProjection": false,
    "HideWhenFaceDown": false,
    "Hands": false,
    "CustomMesh": {
      "MeshURL": "http://cloud-3.steamusercontent.com/ugc/2131950977870750036/300CF36917189B72625D54B1629C1C41232DD34D/",
      "DiffuseURL": "",
      "NormalURL": "",
      "ColliderURL": "http://cloud-3.steamusercontent.com/ugc/2131950977870750080/3FACD783C95686A8C3378A01DCCBDEF4889C019A/",
      "Convex": false,
      "MaterialIndex": 3,
      "TypeIndex": 0,
      "CustomShader": {
        "SpecularColor": {
          "r": 1.0,
          "g": 1.0,
          "b": 1.0
        },
        "SpecularIntensity": 0.0,
        "SpecularSharpness": 2.0,
        "FresnelStrength": 0.0
      },
      "CastShadows": true
    },
    "LuaScript": "",
    "LuaScriptState": "",
    "XmlUI": "",
    "ChildObjects": []
  }

  for (let y = 0; y < getBoardHeight(cells); y++) {
    for (let x = 0; x < getBoardWidth(cells); x++) {
      if (getBoardCell(cells, x, y) && !(x === center.x && y === center.y)) {
        newPolyomino.ChildObjects.push(createTile(x - center.x, y - center.y))
      }
    }
  }

  return newPolyomino
}

function createTile(x, y) {
  return {
    "GUID": "300bb2",
    "Name": "Custom_Model",
    "Transform": {
      "posX": x,
      "posY": 0.0,
      "posZ": y,
      "rotX": 0.0,
      "rotY": 0.0,
      "rotZ": 0.0,
      "scaleX": 1.0,
      "scaleY": 1.0,
      "scaleZ": 1.0
    },
    "Nickname": "",
    "Description": "",
    "GMNotes": "",
    "AltLookAngle": {
      "x": 0.0,
      "y": 0.0,
      "z": 0.0
    },
    "ColorDiffuse": {
      "r": 0.0,
      "g": 1.0,
      "b": 0.0
    },
    "LayoutGroupSortIndex": 0,
    "Value": 0,
    "Locked": false,
    "Grid": true,
    "Snap": true,
    "IgnoreFoW": false,
    "MeasureMovement": false,
    "DragSelectable": true,
    "Autoraise": true,
    "Sticky": true,
    "Tooltip": true,
    "GridProjection": false,
    "HideWhenFaceDown": false,
    "Hands": false,
    "CustomMesh": {
      "MeshURL": "http://cloud-3.steamusercontent.com/ugc/2131950977870750036/300CF36917189B72625D54B1629C1C41232DD34D/",
      "DiffuseURL": "",
      "NormalURL": "",
      "ColliderURL": "http://cloud-3.steamusercontent.com/ugc/2131950977870750080/3FACD783C95686A8C3378A01DCCBDEF4889C019A/",
      "Convex": false,
      "MaterialIndex": 3,
      "TypeIndex": 0,
      "CustomShader": {
        "SpecularColor": {
          "r": 1.0,
          "g": 1.0,
          "b": 1.0
        },
        "SpecularIntensity": 0.0,
        "SpecularSharpness": 2.0,
        "FresnelStrength": 0.0
      },
      "CastShadows": true
    },
    "LuaScript": "",
    "LuaScriptState": "",
    "XmlUI": ""
  }
}