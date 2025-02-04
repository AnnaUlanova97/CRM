// noinspection JSVoidFunctionReturnValueUsed,JSCheckFunctionSignatures

import ymaps from 'ymaps'

export default class YmapComponent {
    constructor(
        {
            mapID = '',
            defaultCoords = [0, 0],
            mapZoom = 16,
            mapControls = ['zoomControl'],
            mapPoints = [],
            APIVersion = '2.1',
            APIKey = 'e273c332-6d04-405f-8273-41105d961bc5',
            APILang = 'ru_RU',
            params = {}
        } = {}
    )
    {
        if (!mapID) throw new Error('Не передан ID элемента карты')

        this.mapID = mapID
        this.defaultCoords = defaultCoords
        this.mapZoom = mapZoom
        this.mapControls = mapControls
        this.APIConfig = {APIVersion, APIKey, APILang}
        this.mapPoints = mapPoints

        console.log(this)

        this.loadScript().then((ymap) => {
            this.Map = new ymap.Map(this.mapID, {
                center: this.defaultCoords,
                zoom: this.mapZoom,
                controls: this.mapControls
            })
        })
    }

    loadScript() {
        return ymaps
            .load(`//api-maps.yandex.ru/${this.APIConfig.APIVersion}/?apikey=${this.APIConfig.APIKey}&lang=${this.APIConfig.APILang}`)
            .then((ymap) => ymap)
    }

    renderPlacemark(ymap, placemarkData = {}) {
        if (Object.keys(placemarkData).length > 0) {
            return new ymap.Placemark(
                placemarkData.coords ?? this.defaultCoords,
                {},
                ...this.getPlacemarkIconConfig(placemarkData)
            )
        }
    }

    getPlacemarkIconConfig(placemarkData) {
        return {
            iconLayout: 'default#image',
            iconImageHref: placemarkData?.icon?.imagePath,
            icon_imagesize: placemarkData?.icon?.imageSize ?? [24, 32],
            iconImageOffset: placemarkData?.icon?.imageOffset ?? [-12, -32]
        }
    }

    mapPanTo(coords = []) {
        if (this.Map && coords && Array.isArray(coords)) {
            this.Map
                .panTo(coords, {
                    duration: 400,
                    flying: true
                })
                .then(() => {
                    this.Map.container.fitToViewport()
                    this.Map.setCenter(coords)
                    this.Map.setZoom(this.mapZoom, {duration: 400})
                })
                .catch((error) => {
                    throw error
                })
        }
    }
}
