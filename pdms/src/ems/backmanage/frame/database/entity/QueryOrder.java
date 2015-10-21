package ems.backmanage.frame.database.entity;
 public class QueryOrder
{
  private String fieldName;
  private String sort;

  public QueryOrder(String field, String dir)
  {
    this.fieldName = field;
    this.sort = dir;
  }
  public QueryOrder() {
  }
  public String getFieldName() {
    return this.fieldName;
  }
  public void setFieldName(String fieldName) {
    this.fieldName = fieldName;
  }
  public String getSort() {
    return this.sort;
  }
  public void setSort(String sort) {
    this.sort = sort;
  }
}