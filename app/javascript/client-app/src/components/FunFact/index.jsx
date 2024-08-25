import React from 'react'

const funFact = [
  {
      title: '302+',
      subTitle: 'Room & Suites',
  },
  {
      title: '5',
      subTitle: 'Restaurant',
  },
  {
      title: '310+',
      subTitle: 'Exceptional Food',
  },
  {
      title: '35',
      subTitle: 'Activities',
  },

]


const FunFact = (props) => {
    return(
      <section className={`wpo-fun-fact-section ${props.fClass}`}>
          <div className="container-fluid">
              <div className="row">
                  <div className="col col-xs-12">
                      <div className="wpo-fun-fact-grids clearfix">
                          {funFact.map((funfact, fitem) => (
                                <div className="grid" key={fitem}>
                                    <div className="info">
                                        <h3>{funfact.title}</h3>
                                        <p>{funfact.subTitle}</p>
                                    </div>
                                </div>
                            ))}
                      </div>
                  </div>
              </div>
          </div>
      </section>
    )
}

export default FunFact;