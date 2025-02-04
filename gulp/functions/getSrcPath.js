import getProjectType from "./getProjectType.js";

const getSrcPath = () => {
  switch (getProjectType()) {
    case 'laravel' : {
      return 'resources/assets'
    }
    case 'bitrix': {
      return 'local/assets'
    }
    default: {
      return 'src'
    }
  }
}

export default getSrcPath