import getProjectType from "./getProjectType.js";

const getOutputPath = () => {
  switch (getProjectType()) {
    case 'laravel' : {
      return 'public/frontend'
    }
    case 'bitrix': {
      return 'local/frontend'
    }
    default: {
      return 'build'
    }
  }
}

export default getOutputPath